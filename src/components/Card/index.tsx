import { useEffect, useRef, useState } from "react";
import { IColor } from "../../types/Color";
import { ICard } from "../../types/Card";
import styles from "./Card.module.scss";

const Card = ({ id, title, text, favorite, color, onUpdateCard, onClickDelete }: ICard) => {

  const [ cardTitle, setCardTitle ] = useState(title);
  const [ cardText, setCardText ] = useState(text);
  const [ cardColor, setCardColor ] = useState(color);
  const [ cardFavorite, setCardFavorite ] = useState(favorite);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [open, setOpen] = useState(false);
  const buttonColorRef = useRef<any>(null);
  const popoverRef = useRef<any>(null);

  const colors: IColor[] = [
    {
      code: '#BAE2FF',
    },
    {
      code: '#B9FFDD',
    },
    {
      code: '#FFE8AC',
    },
    {
      code: '#FFCAB9',
    },
    {
      code: '#F99494',
    },
    {
      code: '#9DD6FF',
    },
    {
      code: '#ECA1FF',
    },
    {
      code: '#DAFF8B',
    },
    {
      code: '#FFA285',
    },
    {
      code: '#CDCDCD',
    },
    {
      code: '#979797',
    },
    {
      code: '#A99A7C',
    },
  ];

  useEffect(() => {
    if (open && buttonColorRef.current) {
      const rect = buttonColorRef.current.getBoundingClientRect();
      console.log(rect)
      const parentRect = buttonColorRef.current.offsetParent.getBoundingClientRect();

      setPosition({
        top: rect.bottom - parentRect.top + 4,
        left: rect.left - parentRect.left,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonColorRef.current &&
        !buttonColorRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const onActiveEdit = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsEditing(true);
  }

  const onFavChange = (ev: any, value: boolean) => {
    ev.preventDefault();
    ev.stopPropagation();
    setCardFavorite(value);
  }

  useEffect(() => {
    onUpdateCard({
      id: id,
      title: cardTitle,
      text: cardText,
      color: cardColor,
      favorite: cardFavorite,
    });
  }, [cardFavorite, cardColor])

  const onConfirmUpdate = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsEditing(false);

    onUpdateCard({
      id: id,
      title: cardTitle,
      text: cardText,
      color: cardColor,
      favorite: cardFavorite,
    });
  }

  const onColorChange = (ev: any, value: string) => {
    ev.preventDefault();
    ev.stopPropagation();
    setCardColor(value);
    setOpen(false);

    onUpdateCard({
      id: id,
      title: cardTitle,
      text: cardText,
      color: cardColor,
      favorite: cardFavorite,
    });
  }

  return (
    <section className={styles.Card} style={{ backgroundColor: cardColor }}>
      <div className={styles.CardHeader}>
        <input value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} readOnly={!isEditing} />
        {cardFavorite ? (
            <svg onClick={(e) => onFavChange(e, false)} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.60815 6.96899L2.45435 7.7619L7.01347 11.429L5.82412 16.9793L9.98682 13.8077L15.1406 16.9793L13.7531 11.429L17.6184 7.7619L12.3655 6.96899L9.98682 1.81519L7.60815 6.96899Z" fill="#FFA000"/>
              <path d="M10.0664 13.1764L6.42813 15.3729L7.38608 11.2314L4.17356 8.44468L8.41176 8.08666L10.0664 4.17744L11.721 8.08666L15.9593 8.44468L12.7467 11.2314L13.7047 15.3729M19.7427 7.22547L12.7854 6.63522L10.0664 0.219849L7.34737 6.63522L0.390137 7.22547L5.6637 11.8023L4.08647 18.6048L10.0664 14.9955L16.0463 18.6048L14.4594 11.8023L19.7427 7.22547Z" fill="#455A64"/>
            </svg>
          ) : (
            <svg onClick={(e) => onFavChange(e, true)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0364 13.7971L6.3981 15.9936L7.35605 11.8522L4.14353 9.06541L8.38173 8.70738L10.0364 4.79817L11.691 8.70738L15.9292 9.06541L12.7167 11.8522L13.6747 15.9936M19.7126 7.8462L12.7554 7.25594L10.0364 0.840576L7.31734 7.25594L0.360107 7.8462L5.63367 12.4231L4.05644 19.2255L10.0364 15.6162L16.0163 19.2255L14.4294 12.4231L19.7126 7.8462Z" fill="#455A64"/>
            </svg>
          )
        }
      </div>

      <div className={styles.CardContent}>
        <textarea value={cardText} onChange={(e) => setCardText(e.target.value)} readOnly={!isEditing}></textarea>
      </div>

      <div className={styles.CardFooter}>
        
        {!isEditing ? (
            <div className={styles.CardFooterEdit} data-active={isEditing} onClick={(e) => onActiveEdit(e)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.0725 6.63188L11.9603 7.51965L3.38473 16.0763H2.51584V15.2074L11.0725 6.63188ZM14.4725 0.96521C14.2364 0.96521 13.9908 1.05965 13.8114 1.2391L12.0831 2.96743L15.6247 6.5091L17.3531 4.78077C17.7214 4.41243 17.7214 3.79854 17.3531 3.4491L15.1431 1.2391C14.9542 1.05021 14.7181 0.96521 14.4725 0.96521ZM11.0725 3.97799L0.626953 14.4235V17.9652H4.16862L14.6142 7.51965L11.0725 3.97799Z" fill="#51646E"/>
              </svg>
            </div>
          ) : (
            <div className={styles.CardFooterEdit} data-active={false} onClick={(e) => onConfirmUpdate(e)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 10.086L2.164 7L1 8.164L5.25 12.414L13 4.664L11.836 3.5L5.25 10.086Z" fill="#51646E"/>
              </svg>
            </div>
          )
        }

        <div style={{ position: 'relative', display: 'grid', alignItems: 'center' }}>
          <div ref={buttonColorRef} onClick={() => setOpen((prev) => !prev)} className={styles.CardFooterPaint} data-active={open}>
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6238 12.012C16.6238 12.012 14.6238 14.182 14.6238 15.512C14.6238 16.0424 14.8346 16.5511 15.2096 16.9262C15.5847 17.3012 16.0934 17.512 16.6238 17.512C17.1543 17.512 17.663 17.3012 18.0381 16.9262C18.4131 16.5511 18.6238 16.0424 18.6238 15.512C18.6238 14.182 16.6238 12.012 16.6238 12.012ZM2.83384 10.512L7.62384 5.72196L12.4138 10.512M14.1838 9.45196L5.24384 0.511963L3.83384 1.92196L6.21384 4.30196L1.06384 9.45196C0.473838 10.012 0.473838 10.982 1.06384 11.572L6.56384 17.072C6.85384 17.362 7.24384 17.512 7.62384 17.512C8.00384 17.512 8.39384 17.362 8.68384 17.072L14.1838 11.572C14.7738 10.982 14.7738 10.012 14.1838 9.45196Z" fill="#51646E"/>
              <path d="M7.69279 15.5089L2.86279 10.4651H12.4302L7.69279 15.5089Z" fill="#FFA000"/>
            </svg>
          </div>
          {open && (
            <div
              ref={popoverRef}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                background: '#fff',
                border: '1px solid #ccc',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                display: "-webkit-box",
                gap: '8px',
                overflowX: 'scroll',
                maxWidth: '340px',
              }}
            >
              {colors.map(color => {
                return (
                  <div key={color.code} onClick={(e) => onColorChange(e, color.code)} style={{ borderRadius: '100%', width: '32px', height: '32px', backgroundColor: color.code }}></div>
                )
              })}
            </div>
          )}
        </div>

        <div className={styles.CardFooterSpacer}></div>

        <div className={styles.CardFooterDelete} onClick={(e) => onClickDelete(e)} data-active={false}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7428 1.76442L12.4191 0.440796L7.17155 5.68837L1.92397 0.440796L0.600342 1.76442L5.84792 7.012L0.600342 12.2596L1.92397 13.5832L7.17155 8.33563L12.4191 13.5832L13.7428 12.2596L8.49517 7.012L13.7428 1.76442Z" fill="#51646E"/>
          </svg>
        </div>

      </div>
    </section>
  );
};

export default Card;
