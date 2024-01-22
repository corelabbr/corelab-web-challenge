import { Star } from "@phosphor-icons/react";

const NewItem = () => {
    return (
        <div className="w-full px-[10%]  lg:px-[0%] xl:px-[0%] 2xl:px-[0%] flex justify-center">
            <div className="bg-white text-black mt-5 rounded-[25px] lg:rounded-[3px] xl:rounded-[3px] 2xl:rounded-[3px] w-[730.52px] flex-col items-center shadow-md p-4">
                <div className="flex">
                    <input
                        type="text"
                        name=""
                        id=""
                        className=" flex-1 outline-none font-bold text-base placeholder:text-black"
                        placeholder="Título"

                    />
                    <button>
                        <Star size={20} />
                    </button>
                </div>
                <hr className="mt-2 mb-1" />
                <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    className="h-[95px] outline-none w-full"
                    placeholder="Criar nota..."
                ></textarea>
            </div>
        </div>
    );
}

export default NewItem;