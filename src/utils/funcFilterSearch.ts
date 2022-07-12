export const filterCarByAttributes = (car: any,search:string) => {
  if (!search) return car;
  else if (car.name.toLowerCase().includes(search.toLowerCase())) return car;
  else if (car.year === parseInt(search)) return car;
  else if (car.color.toLowerCase().includes(search.toLowerCase())) return car;
  else if (car.price===parseFloat(search)) return car;
  else if (car.description.toLowerCase().includes(search.toLowerCase()))
    return car;
  
 };

 
 