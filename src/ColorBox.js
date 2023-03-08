import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './css/ColorBox.css';

const ColorBox = (props) => {
  const { name, background, id, paletteId, setSingleColor, showLink } = props;
  const [copied, setCopied] = useState(false);

  const handleChangeCopyState = () => {
    setCopied(true);
    const interval = setInterval(() => {
      setCopied(false);
      if (!copied) {
        clearInterval(interval);
      }
    }, 1500);
  };

  const isDarkColor = chroma(background).luminance() <= 0.09;
  const isLightColor = chroma(background).luminance() >= 0.45;

  return (
    <CopyToClipboard text={background} onCopy={handleChangeCopyState}>
      <div className="ColorBox" style={{ background }}>
        <div
          className={`copy-overlay ${copied ? 'show' : undefined}`}
          style={{ background }}
        />
        <div className={`copy-msg ${copied ? 'show' : undefined}`}>
          <h1>Copied!</h1>
          <p className={isLightColor ? 'dark-text' : undefined}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={isDarkColor ? 'light-text' : undefined}>
              {name}
            </span>
          </div>
          <button
            className={`copy-button ${isLightColor ? 'dark-text' : undefined}`}
          >
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => {
              e.stopPropagation();
              setSingleColor(id);
            }}
          >
            <span
              className={`see-more ${isLightColor ? 'dark-text' : undefined}`}
            >
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;