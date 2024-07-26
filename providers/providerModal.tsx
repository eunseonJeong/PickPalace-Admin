
"use client";

import { useEffect, useState } from "react";
import {StoreModal} from "@/components/modal/storeModal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (isMounted === false) return null;

    return (
        <>
            <StoreModal />
        </>
    );
};