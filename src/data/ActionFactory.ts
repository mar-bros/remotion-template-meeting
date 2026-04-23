import { AgentAction, ProtocolType } from "../types";

export class ActionFactory {
  /**
   * Helper to set an agent offline
   */
  static offline(): AgentAction {
    return { isOffline: true };
  }

  /**
   * Happy state with optional floating text
   */
  static happy(floatingText?: string): AgentAction {
    return { emotion: "happy", floatingText };
  }

  /**
   * Angry state with optional floating text
   */
  static angry(floatingText?: string): AgentAction {
    return { emotion: "angry", floatingText };
  }

  /**
   * Thinking state with optional floating text
   */
  static thinking(floatingText?: string): AgentAction {
    return { emotion: "thinking", floatingText: floatingText || "..." };
  }

  /**
   * Shocked state with optional floating text
   */
  static shocked(floatingText?: string): AgentAction {
    return { emotion: "shocked", floatingText: floatingText || "!" };
  }

  /**
   * Whisper to the left
   */
  static whisperLeft(): AgentAction {
    return { movement: "whisper_left" };
  }

  /**
   * Whisper to the right
   */
  static whisperRight(): AgentAction {
    return { movement: "whisper_right" };
  }

  /**
   * Nod in agreement
   */
  static nod(): AgentAction {
    return { movement: "nod" };
  }

  /**
   * Shake head in disagreement
   */
  static shakeHead(): AgentAction {
    return { movement: "shake_head" };
  }

  /**
   * Look around randomly
   */
  static lookAround(): AgentAction {
    return { movement: "look_around" };
  }

  /**
   * Combine multiple factories into a single agentStates record.
   * Usage: ActionFactory.combine({ green: ActionFactory.happy(), white: ActionFactory.offline() })
   */
  static combine(states: Partial<Record<ProtocolType, AgentAction>>): Partial<Record<ProtocolType, AgentAction>> {
    return states;
  }
}
