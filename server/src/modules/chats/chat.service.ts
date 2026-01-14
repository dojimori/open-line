import chatRepository from "./chat.repository";

class ChatService {
  async getAll() {
    const chats = await chatRepository.getAll();
    chats?.reverse();
    return chats;
  }

}

export default new ChatService();