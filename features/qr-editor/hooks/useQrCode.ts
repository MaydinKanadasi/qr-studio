'use client';

import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { type Options } from 'qr-code-styling';

const PREVIEW_SIZE = 280;
const EXPORT_SIZE = 1024;

const defaultOptions: Options = {
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
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
  cornersDotOptions: {
    type: 'dot',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 4,
    imageSize: 0.4,
  },
};

export function useQrCode(
  initialData: string = 'https://qrstudio.app',
  initialSettings?: Partial<Options>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [options, setOptions] = useState<Options>({
    ...defaultOptions,
    ...initialSettings,
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

  function setLogo(file: File | null) {
    if (!file) {
      updateOption({ image: undefined });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateOption({ image: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  function setLogoSize(imageSize: number) {
    updateOption({
      imageOptions: { ...options.imageOptions, imageSize },
    });
  }

  async function download(extension: 'png' | 'svg') {
    const exportQr = new QRCodeStyling({
      ...options,
      width: EXPORT_SIZE,
      height: EXPORT_SIZE,
    });
    await exportQr.download({ extension });
  }

  return { containerRef, options, updateOption, setLogo, setLogoSize, download };
}
