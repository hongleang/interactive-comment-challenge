import { useState } from "react";

export function useModalHandler() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return { openModal, closeModal, modalIsOpen }
}