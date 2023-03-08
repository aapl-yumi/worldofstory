import { useState } from 'react';

export default function DownloadModal({
  open,
  setDownloadModalIsOpen,
}: {
  open: boolean;
  setDownloadModalIsOpen: (downloadModalIsOpen: boolean) => void;
}) {
  const [downloadList, setDownloadList] = useState<any[]>([]);
}
