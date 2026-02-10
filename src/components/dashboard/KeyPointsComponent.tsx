import React, { useState } from "react";
import toast from "react-hot-toast";
import { createApiEndpoint } from "../../config/api";

interface KeyPointsComponentProps {
  documentId: string;
  documentContent: string;
}

const KeyPointsComponent: React.FC<KeyPointsComponentProps> = ({
  documentId,
  documentContent,
}) => {
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const extractKeyPoints = async () => {
    if (!documentContent || documentContent.trim().length < 50) {
      const errorMsg =
        "This document doesn't have enough text to extract key points.";
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);
    setError("");
    setKeyPoints([]);

    try {
      console.log("Extracting key points for document:", documentId);

      const response = await fetch(createApiEndpoint( `documents/${documentId}/key-points`)
       ,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      if (
        !data.keyPoints ||
        !Array.isArray(data.keyPoints) ||
        data.keyPoints.length === 0
      ) {
        throw new Error("No key points could be extracted");
      }

      setKeyPoints(data.keyPoints);
      console.log(`${data.keyPoints.length} key points extracted`);
    } catch (error: any) {
      console.error("Key points extraction error:", error);
      const errorMessage =
        error.message || "Couldn't extract key points. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAll = () => {
    const allPoints = keyPoints.join("\n");
    navigator.clipboard.writeText(allPoints);
    toast.success("Copied!", {
      duration: 1500,
      position: "bottom-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "bold",
        marginRight: "30px",
      },
    });
  };

  const handleCopyPoint = (point: string) => {
    navigator.clipboard.writeText(point);
    toast.success("Copied!", {
      duration: 1000,
      position: "bottom-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "bold",
        marginRight: "30px",
      },
    });
  };

  const handleRegenerate = () => {
    setError("");
    setKeyPoints([]);
    toast.loading("Extracting key points...", { duration: 1000 });
    extractKeyPoints();
  };

  const formatKeyPoint = (point: string): string => {
    return point.replace(/^[•\-]\s*/, "").trim();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600 text-sm">
            Analyzing document for key points...
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This usually takes 5-10 seconds
          </p>
        </div>
      )}

      {/* Key Points Display */}
      {keyPoints.length > 0 && (
       
          <div className="flex-col space-y-4">
            <div className="flex justify-end">
                <span className="text-sm font-medium mb-3 bg-green-100 text-green-700 rounded-sm px-2 py-1">
                {keyPoints.length} key points extracted
              </span>
            </div>
              
          
           
              <div className="flex items-center justify-between gap-x-2">
                <button
                  onClick={handleCopyAll}
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
                  title="Copy all key points"
                >
                  <span className="material-symbols-outlined text-base">
                    content_copy
                  </span>
                  Copy All
                </button>

                <button
                  onClick={handleRegenerate}
                  disabled={isLoading}
                  className="text-sm text-gray-600 hover:text-primary flex items-center gap-1 disabled:opacity-50"
                  title="Regenerate key points"
                >
                  <span className="material-symbols-outlined text-base">
                    refresh
                  </span>
                  Regenerate
                </button>
              </div>
           
       

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="shrink-0 mt-1">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-gray-700">{formatKeyPoint(point)}</p>
                </div>

                <button
                  onClick={() => handleCopyPoint(point)}
                  className="shrink-0 text-gray-400 hover:text-primary transition-colors"
                  title="Copy this point"
                >
                  <span className="material-symbols-outlined text-sm">
                    content_copy
                  </span>
                </button>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-2 border-t pt-4">
            <span className="material-symbols-outlined text-sm">info</span>
            <p>
              AI analyzes your document to identify the most important
              information
            </p>
          </div>
        </div>
      )}

      {/* Empty State - Show if not loading and no key points */}
      {!isLoading && keyPoints.length === 0 && !error && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="mb-4">
            <span className="material-symbols-outlined text-4xl text-gray-300">
              checklist
            </span>
          </div>

          <h4 className="text-gray-700 font-medium mb-2">Extract Key Points</h4>
          <p className="text-gray-500 text-sm mb-6">
            Get the most important information from your document as clear
            bullet points
          </p>

          <button
            onClick={extractKeyPoints}
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            Extract Key Points
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Example of what you'll get:
            </p>
            <div className="text-left bg-gray-50 p-4 rounded-lg text-sm space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <p className="text-gray-600">
                  Main objective and purpose of the document
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <p className="text-gray-600">
                  Key recommendations and action items
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <p className="text-gray-600">
                  Important dates, deadlines, or timelines
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <p className="text-gray-600">
                  Critical data, statistics, or findings
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyPointsComponent;
