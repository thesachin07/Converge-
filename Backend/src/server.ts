import { IncomingMessage } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import * as Y from "yjs";

const port = Number(process.env.PORT ?? 3001);
const maxDocumentIdLength = 200;

type Room = {
  document: Y.Doc;
  clients: Set<WebSocket>;
};

type UpdateMessage = {
  type: "update";
  update: string;
};

const rooms = new Map<string, Room>();

function getDocumentId(request: IncomingMessage): string | null {
  const host = request.headers.host ?? "localhost";
  const url = new URL(request.url ?? "/", `http://${host}`);
  const documentId = url.searchParams.get("documentId")?.trim();

  if (!documentId || documentId.length > maxDocumentIdLength) {
    return null;
  }

  return documentId;
}

function sendError(socket: WebSocket, message: string): void {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "error", message }));
  }
}

function isUpdateMessage(value: unknown): value is UpdateMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Partial<UpdateMessage>;
  return message.type === "update" && typeof message.update === "string";
}

function decodeUpdate(encodedUpdate: string): Uint8Array | null {
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encodedUpdate)) {
    return null;
  }

  return new Uint8Array(Buffer.from(encodedUpdate, "base64"));
}

function broadcastUpdate(room: Room, sender: WebSocket, update: Uint8Array): void {
  const message = JSON.stringify({
    type: "update",
    update: Buffer.from(update).toString("base64"),
  });

  for (const client of room.clients) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function removeClient(documentId: string, socket: WebSocket): void {
  const room = rooms.get(documentId);

  if (!room) {
    return;
  }

  room.clients.delete(socket);

  if (room.clients.size === 0) {
    room.document.destroy();
    rooms.delete(documentId);
  }
}

const server = new WebSocketServer({ port });

server.on("connection", (socket, request) => {
  const documentId = getDocumentId(request);

  if (!documentId) {
    sendError(socket, "A valid documentId query parameter is required.");
    socket.close(1008, "Missing documentId");
    return;
  }

  let room = rooms.get(documentId);
  if (!room) {
    room = { document: new Y.Doc({ guid: documentId }), clients: new Set() };
    rooms.set(documentId, room);
  }

  room.clients.add(socket);
  socket.send(JSON.stringify({
    type: "state",
    update: Buffer.from(Y.encodeStateAsUpdate(room.document)).toString("base64"),
  }));

  socket.on("message", (data) => {
    let parsedMessage: unknown;

    try {
      parsedMessage = JSON.parse(data.toString());
    } catch {
      sendError(socket, "Messages must be valid JSON.");
      return;
    }

    if (!isUpdateMessage(parsedMessage)) {
      sendError(socket, "Message must contain type 'update' and a base64 update.");
      return;
    }

    const update = decodeUpdate(parsedMessage.update);
    if (!update || update.length === 0) {
      sendError(socket, "The update must be a non-empty base64 string.");
      return;
    }

    try {
      Y.applyUpdate(room.document, update);
      broadcastUpdate(room, socket, update);
    } catch {
      sendError(socket, "The Yjs update could not be applied.");
    }
  });

  socket.on("close", () => removeClient(documentId, socket));
  socket.on("error", () => removeClient(documentId, socket));
});

server.on("listening", () => {
  console.log(`Converge collaboration server listening on ws://localhost:${port}`);
});

server.on("error", (error) => {
  console.error("WebSocket server error:", error);
});
