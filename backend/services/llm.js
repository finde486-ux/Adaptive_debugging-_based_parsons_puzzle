class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'mock';
  }

  async generateHint(puzzleId, history, currentCode) {
    console.log(`Generating hint for puzzle ${puzzleId} using ${this.provider}`);
    if (this.provider === 'mock') {
      return "Try checking the indentation of your loops. In Python, blocks are defined by whitespace.";
    }
    // Real implementation would call OpenAI/Anthropic/etc.
    return "AI-generated hint based on your current code structure.";
  }

  async explainLine(puzzleId, lineId) {
    console.log(`Explaining line ${lineId} for puzzle ${puzzleId}`);
    return "This line iterates over the range provided, assigning each value to the variable i in each iteration.";
  }
}

module.exports = new LLMService();
