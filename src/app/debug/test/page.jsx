// app/debug/page.jsx
"use client";

import { useState } from "react";

export default function DebugPage() {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [jsonBody, setJsonBody] = useState("");
  const [response, setResponse] = useState(null);

  const handleRequest = async () => {
    
      setResponse(null);
      const parsedHeaders = headers ? JSON.parse(headers) : {}; // Parse headers JSON

      let options = {
        method: jsonBody ? "POST" : "GET", // Define o método com base no campo JSON
        headers: parsedHeaders
      };

      if (jsonBody) {
        options.body = JSON.stringify(JSON.parse(jsonBody)); // Adiciona o corpo apenas se houver JSON
      }

      const res = await fetch(url, options);
      const data = await res.headers;
      setResponse(data);
    
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Debug Page</h1>
      <div className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border p-2 w-full mb-2"
        />
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          placeholder="Headers (JSON format)"
          className="border p-2 w-full mb-2 h-[700px]"
        />
        <textarea
          value={jsonBody}
          onChange={(e) => setJsonBody(e.target.value)}
          placeholder="JSON Body"
          className="border p-2 w-full mb-2 h-24"
        />
        <button
          onClick={handleRequest}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={!url} // Desabilita o botão se a URL estiver vazia
        >
          Send Request
        </button>
      </div>
      {response && (
        <div className="mt-4">
          <h2 className="text-lg mb-2">Response:</h2>
          <pre className="bg-gray-100 p-2 text-black">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
    }
    
