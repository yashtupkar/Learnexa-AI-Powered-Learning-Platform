// contexts/ModalManager.js
import { createContext, useState, useMemo } from "react";
import GenerateModal from "../components/modal/GenerateModal";
import InviteModal from "../components/modal/InviteModal";
import QuizGeneratingModal from "../components/modal/QuizGeneratingModal";
import QuizOpenModal from "../components/modal/QuizOpenModal";
import StreakModal from "../components/modal/StreakModal";
import UpgradeModal from "../components/modal/UpgradeModal";
import ReportIssueModal from "../components/modal/ReportIssueModal";


export const ModalContext = createContext();

export const MODAL_TYPES = {
  GENERATE: "generate",
  INVITE: "invite",
  QUIZ_GENERATING: "quiz_generating",
  QUIZ_OPEN: "quiz_open",
  STREAK: "streak",
  UPGRADE: "upgrade",
  REPORT: "report_issue",
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.GENERATE]: GenerateModal,
  [MODAL_TYPES.INVITE]: InviteModal,
  [MODAL_TYPES.QUIZ_GENERATING]: QuizGeneratingModal,
  [MODAL_TYPES.QUIZ_OPEN]: QuizOpenModal,
  [MODAL_TYPES.STREAK]: StreakModal,
  [MODAL_TYPES.UPGRADE]: UpgradeModal,
  [MODAL_TYPES.REPORT]: ReportIssueModal,
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    modalType: null,
    modalProps: {},
  });

  const openModal = (modalType, modalProps = {}) => {
    setModalState({
      isOpen: true,
      modalType,
      modalProps,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      modalType: null,
      modalProps: {},
    });
  };

  const renderModal = useMemo(() => {
    if (!modalState.isOpen || !modalState.modalType) return null;

    const ModalComponent = MODAL_COMPONENTS[modalState.modalType];
    if (!ModalComponent) return null;

    return <ModalComponent {...modalState.modalProps} onClose={closeModal} />;
  }, [modalState.isOpen, modalState.modalType, modalState.modalProps]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, MODAL_TYPES }}>
      {children}
      {renderModal}
    </ModalContext.Provider>
  );
};
