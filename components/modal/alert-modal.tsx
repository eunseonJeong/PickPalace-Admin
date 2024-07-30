"use client";

import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onConfirm: () => void;
}

export const AlertModal: React.FC<Props> = ({
  isOpen,
  onClose,
  loading,
  onConfirm,
}: Props) => {
  // const [isMounted, setIsMounted] = useState(false);
  //
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  //
  // if (!isMounted) {
  //   return null;
  // }
  return (
    <Modal
      title="정말 삭제하시겠습니까?"
      description="삭제하면 되돌릴 수 없습니다."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          확인
        </Button>
      </div>
    </Modal>
  );
};
