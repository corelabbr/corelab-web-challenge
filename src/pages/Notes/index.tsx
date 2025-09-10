import { useEffect, useState, useRef } from "react";
import { getCards, saveCard } from "../../lib/api";
import { Card } from "../../components";
import styles from "./Notes.module.scss";
import { CardType } from "../../types/CardType";
import { CardDTO } from "../../types/CardDTO";
import { Palette, Star } from "lucide-react";

const NotesPage = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [favoriteCards, setFavoriteCards] = useState<CardType[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [takeNote, setTakeNote] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const [favorite, setFavorite] = useState(true);
  const [color, setColor] = useState("#4292a0ff");
  const colorRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    colorRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const favoriteChange = () => {
    setFavorite(!favorite);
  };

  const createCard = async () => {
    const newCard: CardDTO = {
      title: titleRef.current?.value || "",
      note: noteRef.current?.value || "",
      color: color,
      is_favorite: favorite ? 1 : 0,
    };
    await saveCard(newCard);

    if (titleRef.current) {
      titleRef.current.value = "";
    }

    if (noteRef.current) {
      noteRef.current.value = "";
    }

    await setCardsVariebles();
  };

  const setCardsVariebles = async () => {
    const allCards: CardType[] | undefined = await getCards();
    const favorite: CardType[] = [];
    const others: CardType[] = [];

    allCards?.forEach((card: CardType) => {
      if (card.is_favorite) {
        favorite.push(card);
        return;
      }
      others.push(card);
    });
    setFavoriteCards(favorite);
    setCards(others);
  };

  const searchCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const filteredFavCards = favoriteCards.filter(
    (card: CardType) =>
      card.title.toLowerCase().includes(searchInput.trim()) ||
      card.note.toLowerCase().includes(searchInput.trim()),
  );

  const filteredCards = cards.filter(
    (card: CardType) =>
      card.title.toLowerCase().includes(searchInput.trim()) ||
      card.note.toLowerCase().includes(searchInput.trim()),
  );

  useEffect(() => {
    setCardsVariebles();
  }, []);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Core Notes</h1>
          <input
            name="search"
            placeholder="Search notes..."
            className={styles.searchBar}
            value={searchInput}
            onChange={searchCards}
          />
        </div>

        <div className={styles.notesForm}>
          {takeNote ? (
            <div>
              <input
                ref={titleRef}
                type="text"
                name=""
                id=""
                placeholder="Title"
              />
              <textarea
                ref={noteRef}
                name=""
                id=""
                placeholder="Take a note..."
              />
              <div className={styles.buttonsBar}>
                <div className={styles.iconButtons}>
                  <button onClick={handleClick} style={{ color }}>
                    <Palette strokeWidth={1.75} />
                  </button>

                  <input
                    type="color"
                    ref={colorRef}
                    value={color}
                    onChange={handleChange}
                    style={{ visibility: "hidden", width: "0", height: "0" }}
                  />
                  <button color="red">
                    <Star
                      fill={favorite ? "#f5e067" : "none"}
                      color={favorite ? "#f5e067" : "#b9c5cb"}
                      onClick={favoriteChange}
                    />
                  </button>
                </div>
                <div className={styles.saveButtons}>
                  <button
                    className={styles.cancel}
                    onClick={() => setTakeNote(false)}
                  >
                    Cancel
                  </button>
                  <button className={styles.save} onClick={createCard}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className={styles.initialNote} onClick={() => setTakeNote(true)}>
              Take a note...
            </p>
          )}
        </div>

        {filteredFavCards.length ? <p>Favorites:</p> : null}
        <div className={styles.favoriteCards}>
          {filteredFavCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              reloadCards={setCardsVariebles}
            ></Card>
          ))}
        </div>
        {filteredCards.length ? <p>Others:</p> : null}
        <div className={styles.favoriteCards}>
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              reloadCards={setCardsVariebles}
            ></Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NotesPage;
