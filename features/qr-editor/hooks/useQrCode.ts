'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { type Options } from 'qr-code-styling';

const defaultOptions: Options = {
  width: 280,
  height: 280,
  type: 'svg',
  data: 'https://qrstudio.app',
  margin: 8,
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
  dotsOptions: {
    color: '#000000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
};

export function useQrCode(initialData: string = 'https://qrstudio.app') {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [options, setOptions] = useState<Options>({
    ...defaultOptions,
    data: initialData,
  });

  // İlk oluşturma
  useEffect(() => {
    if (!containerRef.current) return;
    qrRef.current = new QRCodeStyling(options);
    qrRef.current.append(containerRef.current);
    // Sadece mount'ta çalışsın
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ayarlar her değiştiğinde güncelle (canlı önizleme)
  useEffect(() => {
    qrRef.current?.update(options);
  }, [options]);

  function updateOption(patch: Partial<Options>) {
    setOptions((prev) => ({ ...prev, ...patch }));
  }

  async function download(extension: 'png' | 'svg') {
    await qrRef.current?.download({ extension });
  }

  return { containerRef, options, updateOption, download };
}
