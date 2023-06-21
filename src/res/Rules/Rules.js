import { useState } from "react";
import Modal from "react-modal";

const Rules = ({ modalTitle, modalBody }) => {
  const [showRules, setShowRules] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#21003E",
      color: "white",
      fontSize: "1.2rem",
      padding: 20,
      marginTop: 50,
    },
    
  };

  return (
    <>
    <div>
      <div
        onClick={() => setShowRules(true)}
      >
        RULES
      </div>
      <Modal
        isOpen={showRules}
        ariaHideApp={false}
        onRequestClose={() => setShowRules(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          onClick={() => setShowRules(false)}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            color: "red",
            fontSize: 30,
          }}
        >
          X
        </div>
        <h2 style={{ letterSpacing: 2, marginTop: 0 }} >
          {modalTitle}
        </h2>
        {modalBody?.length > 0
          ? modalBody.map((p, i) => {
              return (
                <div key={`Sentence_${p}_${i}`}>
                  <div>{p}</div>
                  <br />
                </div>
              );
            })
          : null}
      </Modal>
      </div>
    </>
  );
};

export default Rules;
