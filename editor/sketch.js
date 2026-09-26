import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1100,
  seed: 1999,
};

export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 20;

  p.background(255);

  // 1. HEADER
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(20);
  p.text("REVERSE 1999 x ATOMIC", w / 2, 28);

  dashedLine(p, margin, 60, w - margin, 60, 6, 4);

  // 2. METADATA BLOCK
  p.textSize(10);
  p.textStyle(p.NORMAL);
  const items = [
    { label: "FACILITY", value: "3826" },
    { label: "SUBJECT",  value: "LEFT & RIGHT TWINS" },
    { label: "STATUS",   value: "SYNCHRONIZED" },
  ];

  items.forEach(({ label, value }, i) => {
    const yPos = 75 + i * 18;
    p.textAlign(p.LEFT, p.TOP);
    p.text(label, margin, yPos);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(value, w - margin, yPos);
  });

  dashedLine(p, margin, 135, w - margin, 135, 6, 4);

  // 3. GENERATIVE ARTWORK
  p.push();

  // Perspective Architectural Ceiling Grids
  p.stroke(0);
  p.strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    p.line(margin, 180 + i * 40, w - margin, 160 + i * 50);
  }

  // Floating Polymer Bubbles
  p.fill(0);
  p.noStroke();
  const bubbles = [
    { x: 120, y: 200, r: 10 },
    { x: 290, y: 240, r: 14 },
    { x: 320, y: 310, r: 8 },
    { x: 80,  y: 480, r: 12 },
  ];
  bubbles.forEach(({ x, y, r }) => p.ellipse(x, y, r, r * 1.5));

  // The Twins (Action Lines & Heads)
  p.stroke(0);
  p.strokeWeight(5);
  p.noFill();

  // Primary Standing Axis & Pose
  p.line(w * 0.7, 180, w * 0.45, 620);
  // Secondary Leaning Axis & Pose
  p.line(w * 0.15, 580, w * 0.6, 360);

  // Faceted Heads (Mirror Polished Steel)
  p.fill(0);
  p.ellipse(w * 0.7 - 12, 240, 26, 34);
  p.ellipse(w * 0.45, 400, 26, 34);

  // Sweeping Cable Harnesses
  p.noFill();
  p.strokeWeight(1.5);
  p.bezier(40, 240, 280, 280, 90, 480, 320, 560);
  p.bezier(w - 30, 200, 70, 340, 290, 620, 50, 720);

  // Upper & Lower Sweeping Curves
  p.stroke(0);
  p.strokeWeight(2);
  p.noFill();
  p.bezier(margin, 150, w * 0.85, 160, w - margin, 240, w - margin, 380);
  p.bezier(margin, 175, w * 0.55, 230, w - 35, 400, w - margin, 380);

  p.bezier(margin, 780, w * 0.65, 660, w - margin, 820, w - margin, 920);
  p.bezier(margin, 820, w * 0.35, 740, w * 0.5, 890, w - margin, 920);

  p.pop();

  // 4. FOOTER & BARCODE
  dashedLine(p, margin, 950, w - margin, 950, 6, 4);

  const barcodeValue = "ATOMIC-REVERSE-1999";
  drawBarcode(p, barcodeValue, w / 2, 975);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1035);
  p.text("*** ATOMIC HEART x REVERSE 1999 ***", w / 2, 1060);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  p.drawingContext.setLineDash([dash, gap]);
  p.line(x1, y1, x2, y2);
  p.drawingContext.setLineDash([]);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1.5,
    height: 50,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  p.drawingContext.drawImage(
    barcodeCanvas,
    Math.floor(centerX - barcodeCanvas.width / 2),
    y
  );
}
