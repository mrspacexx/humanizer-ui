"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState("original");
  const [creativity, setCreativity] = useState("medium");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");

    try {
const response = await fetch('https://9ixc8puccjppea-8000.proxy.runpod.net/humanize', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: inputText,
            tone,
            length,
            creativity,
          }),
        }
      );

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("⚠️ Bir hata oluştu. Sunucuya ulaşılamıyor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
<main className="min-h-screen bg-grid-pattern bg-repeat bg-fixed text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          ✨ HumanoText
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                🎯 AI-Generated Text
              </label>
              <Textarea
                rows={10}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
              />

              {/* Tone */}
              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  🧠 Tone
                </label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose tone..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Length */}
              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  📏 Length
                </label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose length..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shorter">Shorter</SelectItem>
                    <SelectItem value="original">Original</SelectItem>
                    <SelectItem value="longer">Longer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Creativity */}
              <div className="mt-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  🎨 Creativity
                </label>
                <Select value={creativity} onValueChange={setCreativity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose creativity..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 w-full transition-all duration-200 hover:scale-[1.02]"
              >
                {loading ? "⏳ Rewriting..." : "🔁 Rewrite"}
              </Button>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                📝 Humanized Output
              </label>
              <div className="min-h-[10rem] bg-gray-50 p-4 rounded-md text-sm whitespace-pre-wrap border">
                {result || "⚡️ Rewritten text will appear here."}
              </div>

              {result && (
                <div className="mt-4 flex items-center justify-between">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="text-sm transition-all duration-200 hover:scale-[1.02]"
                  >
                    📋 Copy
                  </Button>
                  {copied && (
                    <span className="text-green-600 text-sm">✅ Copied!</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}