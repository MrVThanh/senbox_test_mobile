import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Html5QrcodeScanner, Html5QrcodeResult } from "html5-qrcode";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { qrbox: { width: 250, height: 250 }, fps: 120,  }, false);

    const onScanSuccess = (decodedText: string, decodedResult: Html5QrcodeResult) => {
      console.log("Decoded text: ", decodedText);
      console.log("Decoded result: ", decodedResult);
      setData(decodedText);
      scanner.clear();
    };

    const onScanError = (errorMessage: string) => {
      console.error("Scan error: ", errorMessage);
    };

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} pt-56 pr-4 bg-white text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="pt-20 flex flex-col gap-4 w-full h-full items-center justify-center">
        <h1 className="text-3xl font-bold text-center">QR Code Scanner _ Hello world</h1>
        <div id="reader" style={{ width: "500px", height: "500px" }}>{data}</div>
      </div>
    </div>
  );
}