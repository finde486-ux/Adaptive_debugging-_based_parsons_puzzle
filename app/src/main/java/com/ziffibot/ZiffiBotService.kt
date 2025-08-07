package com.ziffibot

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.AccessibilityServiceInfo
import android.graphics.PixelFormat
import android.view.*
import android.view.accessibility.AccessibilityEvent
import android.widget.Button
import android.widget.Toast
import kotlinx.coroutines.*

class ZiffiBotService : AccessibilityService() {

    private val scope = CoroutineScope(Dispatchers.Default)
    private var overlayView: View? = null
    private var windowManager: WindowManager? = null
    private var activeTable: Boolean = false

    override fun onServiceConnected() {
        super.onServiceConnected()
        val info = AccessibilityServiceInfo().apply {
            packageNames = arrayOf("com.ziffi.chess") // change if package differs
            eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED or
                         AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED
            feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC
        }
        serviceInfo = info
        showBubble()
    }

    private fun showBubble() {
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )
        params.gravity = Gravity.TOP or Gravity.START
        params.x = 0
        params.y = 300

        overlayView = LayoutInflater.from(this).inflate(R.layout.bubble, null)
        overlayView!!.findViewById<Button>(R.id.btnYes).setOnClickListener {
            activeTable = true
            Toast.makeText(this, "ZiffiBot ON", Toast.LENGTH_SHORT).show()
            hideBubble()
        }
        overlayView!!.findViewById<Button>(R.id.btnNo).setOnClickListener {
            activeTable = false
            hideBubble()
        }
        windowManager!!.addView(overlayView, params)
    }

    private fun hideBubble() {
        if (overlayView != null) {
            windowManager!!.removeView(overlayView)
            overlayView = null
        }
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (!activeTable) return
        // crude: every time board changes, analyse after 1.5 s
        scope.launch {
            delay(1500)
            val fen = screenToFen()            // TODO implement vision
            val move = Engine.bestMove(fen)
            injectMove(move)
        }
    }

    private fun screenToFen(): String {
        // placeholder – returns fixed demo FEN
        return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    }

    private fun injectMove(move: String) {
        // crude: toast the move for now
        withContext(Dispatchers.Main) {
            Toast.makeText(this@ZiffiBotService, "Play $move", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onInterrupt() {}
}
