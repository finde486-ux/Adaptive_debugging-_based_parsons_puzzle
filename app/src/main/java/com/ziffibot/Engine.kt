package com.ziffibot

object Engine {

    // ultra-simple 6-move point grabber
    fun bestMove(fen: String): String {
        // 1. Parse FEN → board (simplified)
        // 2. Generate captures & promotions
        // 3. Pick highest point delta
        // For now just return a dummy move
        return "e2e4"
    }
}
