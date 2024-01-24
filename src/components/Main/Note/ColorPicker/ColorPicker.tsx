import { useMutation, useQueryClient } from "react-query";
import { Note } from "../../../../@types/Note";
import { updateNote } from "../../../../services/notes";
import { motion } from "framer-motion";


export const colors = [
  {
    color: '#BAE2FF',
    name: 'azul',
  },
  {
    color: '#B9FFDD',
    name: 'verde',
  },
  {
    color: '#FFE8AC',
    name: 'amarelo',
  },
  {
    color: '#FFCAB9',
    name: 'rosa',
  },
  {
    color: '#F99494',
    name: 'vermelho',
  },
  {
    color: '#9DD6FF',
    name: 'azul',
  },
  {
    color: '#ECA1FF',
    name: 'roxo',
  },
  {
    color: '#DAFF8B',
    name: 'amarelo',
  },
  {
    color: '#FFA285',
    name: 'laranja',
  },
  {
    color: '#CDCDCD',
    name: 'cinza',
  },
  {
    color: '#979797',
    name: 'cinza',
  },
  {
    color: '#A99A7C',
    name: 'marrom',
  },
]

const ColorPicker = (data: Note) => {

  const client = useQueryClient();
  const deleteMutation = useMutation((data: Note) => updateNote(data), {
    onSuccess: () => {
      client.invalidateQueries(["notes"])
    }
  });

  const handleChangeColor = async (color: string) => {

    const { title, favorite, desc, id } = data;
    deleteMutation.mutate({ title, favorite, desc, color, id });

  }

  return (
    <motion.div
      transition={{
        layout: { duration: 0.4 },
      }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 5, opacity: 0 }}
      className="rounded-lg border border-gray-300 bg-white shadow shadow-gray-400 absolute w-[180px] sm:w-auto z-50 mt-6 ml-10 flex flex-wrap items-center justify-center p-4 gap-2"
    >
      {colors.map(color => (
        <div
          key={color.color}
          className="h-4 w-4 rounded-[50%] cursor-pointer hover:scale-110 transition-all duration-500"
          style={{ backgroundColor: color.color }}
          onClick={() => handleChangeColor(color.color)}
        >
        </div>
      ))}
    </motion.div>
  )
}

export default ColorPicker