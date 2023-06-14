import React, { useEffect, useState } from "react";
import Board from "./Board";
import { auth, db } from "../Firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { useUserLoged } from "../assets/useUserLoged";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const MemoTest = () => {
  const [user] = useAuthState(auth);
  const [animals, setAnimals] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeGameSeconds, setTimeGameSeconds] = useState(0);
  const [timeGameMinutes, setTimeGameMinutes] = useState(0);
  const [score, setScore] = useState(0);
  const userLoged = useUserLoged();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    restartMemoTest();
  };

  useEffect(() => {
    const collectionRef = collection(db, "cards");

    getDocs(collectionRef)
      .then((response) => {
        const dataDocs = response.docs.map((doc) => ({
          ...doc.data(),
        }));
        setDataInfo(dataDocs);
      })
      .catch((error) => {
        toast.error("A ocurrido un error: " + error, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  useEffect(() => {
    const animalesDuplicados = mezclarCartas([...dataInfo, ...dataInfo]);
    setAnimals(
      animalesDuplicados.map((item, i) => ({
        index: i,
        item,
        flipped: false,
      }))
    );
  }, [dataInfo]);

  const mezclarCartas = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handleMemoCLick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let cartasCopy = [...animals];
    cartasCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setAnimals(cartasCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
      if (!startTime) {
        setStartTime(new Date());
      }
    } else if (selectedMemoBlock.item === memoBlock.item) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        cartasCopy.splice(memoBlock.index, 1, memoBlock);
        cartasCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setAnimals(cartasCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (animals.length === 0 || animals.some((animal) => !animal.flipped)) {
      setCompleted(false);
      return;
    }

    let allFlipped = true;

    for (let i = 0; i < animals.length; i++) {
      if (!animals[i].flipped) {
        allFlipped = false;
        break;
      }
    }

    if (allFlipped) {
      setEndTime(new Date());
      setCompleted(true);

      setTimeout(() => {
        showModal();
      }, 2000);
    } else {
      setCompleted(false);
    }
  }, [animals]);

  useEffect(() => {
    if (startTime && endTime) {
      const timeDiff = Math.abs(endTime - startTime);
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeGameSeconds(seconds);
      setTimeGameMinutes(minutes);

      if (seconds > 30 && seconds < 60) {
        setScore(10);
      } else if (seconds < 30) {
        setScore(20);
      } else if (minutes > 0) {
        setScore(5);
      }

      if (score !== 0 && user) {
        addWinDocument();
      }
    }
  }, [endTime, score]);

  const addWinDocument = async () => {
    const docRef = doc(db, "users", userLoged.id);

    const winData = {
      fecha_hora: new Date(),
      tiempo_en_completarlo: `${timeGameMinutes} minutos y ${timeGameSeconds} segundos`,
      score: score,
    };

    await updateDoc(docRef, {
      wins: firebase.firestore.FieldValue.arrayUnion(winData),
    });
  };

  const restartMemoTest = () => {
    const animalesDuplicados = mezclarCartas([...dataInfo, ...dataInfo]);
    setAnimals(
      animalesDuplicados.map((item, i) => ({
        index: i,
        item,
        flipped: false,
      }))
    );
    setCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setTimeGameSeconds(0);
    setTimeGameMinutes(0);
    setScore(0);
  };

  return (
    <div className="memoTest">
      <Board
        animals={animals}
        animating={animating}
        handleMemoCLick={handleMemoCLick}
      />

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okText="Volver a Jugar"
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        closable={false}
        className="custom-modal"
        footer={[
          <button key="ok" onClick={handleOk} className="modalBtnReset">
            Volver a Jugar
          </button>,
        ]}
      >
        <h4 className="custom-modal__title">
          FELICIDADES! <CheckSquareTwoTone />{" "}
        </h4>
        <p className="custom-modal__text">
          Has completado el juego en: {timeGameMinutes} minutos y{" "}
          {timeGameSeconds} segundos, por lo tanto has obtenido {score} puntos!
        </p>
      </Modal>
    </div>
  );
};

export default MemoTest;
