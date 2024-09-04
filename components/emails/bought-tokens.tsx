import * as React from "react";

interface BoughtTokensProps {
  tokens: string;
}

export const BoughtTokens: React.FC<Readonly<BoughtTokensProps>> = ({
  tokens,
}) => (
  <div
    style={{
      backgroundColor: "#065f46",
      textAlign: "center",
      color: "white",
      padding: "20px",
    }}
  >
    <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Congratulations</h1>

    <p style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "20px" }}>
      You successfully bought {tokens} tokens!
    </p>

    <p style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "20px" }}>
      Go and spend them to create your unique story!
    </p>
  </div>
);
