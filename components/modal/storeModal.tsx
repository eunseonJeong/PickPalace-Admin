
"use client";

import {useStoreModal} from "@/hooks/useStoreModal";
import {Modal} from "@/components/modal/modal";

export const StoreModal = () => {
    // 상점 모달 훅 사용
    const { isOpen, onClose } = useStoreModal();

    return (
        <Modal
            title="상점 만들기"
            description="새 상점을 만들어 상품들과 카테고리를 관리해보세요!"
            isOpen={isOpen}
            onClose={onClose}
        >
            TODO: 상점을 생성할 폼 만들기
        </Modal>
    );
};