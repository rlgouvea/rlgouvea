import { ImageDownloader } from "@samvera/image-downloader";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";

const CardImage = ({ item }) => {
  const [copied, setCopied] = useState(false);

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <div className="containerCard">
      <div
        className="card"
        key={item.img}
        cols={item.cols || 1}
        rows={item.rows || 1}
      >
        <img
          {...srcset(item, 121, item.rows, item.cols)}
          alt={item.title}
          loading="lazy"
        />
        <div className="link">
          <ImageDownloader
            imageUrl={item}
            imageTitle={item.name}
            style={{
              cursor: "pointer",
              top: "45%",
              left: "40%",
              position: "relative",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            Baixar
          </ImageDownloader>
        </div>
      </div>
      <CopyToClipboard
        text={item}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3500);
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            //width: "100%",
            cursor: "pointer",
          }}
        >
          Copie aqui o link da imagem
          <BiCopy size="1.3rem" color={copied ? "blue" : "#00c569"} />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CardImage;
