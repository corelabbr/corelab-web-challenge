import { ICard } from '../types/Card';

import Card from '../components/Card';

import { motion } from 'framer-motion';

const RenderCards = ({ cardList }: { cardList: ICard[] }) => {
  if (cardList.length === 0) return <></>;

  return (
    <motion.section
      className="w-100 d-flex flex-wrap align-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {cardList.map((i: ICard) => (
        <motion.div
          className="d-flex flex-wrap align-items-center"
          key={i.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Card {...i} />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default RenderCards;
