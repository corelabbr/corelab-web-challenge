import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search, InputLabel, TitleAd, InputSelect } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import { colors, Dialog, Grid, Alert, TextField, MenuItem } from "@mui/material"
import { useIndex } from "../../data/hooks/useIndex";
import { idText } from "typescript";
import {
  toggleFavorite,
  registerVehicle,
  deleteVehicle,
  updateVehicle,
  }  from "../../services/index"
import { PassThrough } from "stream";


//import { InputLabel } from "../../components/FormInput/index"

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  const {
    buttonActivate, 
    setButtonActivate,
    deleteActivate,
    setDeleteActivate,
    name,
    setName,
    price, 
    setPrice,
    color,
    setColor,
    year,
    setYear,
    plate,
    setPlate,
    description,
    setDescription,
    itemToDelete,
    setItemToDelete,
    cleanForm,
    idVehicleSelected,
    setIdVehicleSelecter,
    isFavoriteVehicle,
    setIsFavoriteVehicle,
    filterActivate,
    setFilterActivate,
    maxValue,
    setMaxValue,
    colorFilter,
    setColorFilter,
    yearFilter,
    setYearFilter,
    minValue,
    setMinValue,
    } = useIndex()


  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload.data);
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload.data);
    };

    fetchVehicles();
  }, [vehicles, search]);
  

  console.log(yearFilter);
  console.log(colorFilter);
  console.log(maxValue);
  console.log(minValue)
  console.log(vehicles)
  
  
  const vehicleYears = vehicles.map(item => item.year)
  const vehicleColors = vehicles.map(item => item.color)

  const vehicleYearsFilter = vehicleYears.filter(function(ele , pos){
    return vehicleYears.indexOf(ele) == pos;
  }) 
const vehicleColorsFilter = vehicleColors.filter(function(ele , pos){
  return vehicleColors.indexOf(ele) == pos;
  }) 
 
  
  
  const vehiclesSearch = vehicles.filter(item => Object.values(item).includes(search))

  const vehiclesFavorites: IVehicle[] = search ? vehiclesSearch.filter( item => item.isFavorite == 1) : vehicles.filter( item => item.isFavorite == 1) //item.meta.is_Favorite  ==  1
  const vehiclesCommuns: IVehicle[] = search ? vehiclesSearch.filter( item => item.isFavorite == 0):  vehicles.filter( item => item.isFavorite == 0)
  
  
  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search 
        placeholder="Search" 
        value={search} 
        onChange={(e) => {setSearch(e.target.value)}}
        onClickFilter={(e) => setFilterActivate(true)} />
        
        <Button text="Add new vehicle" onClick={() => {
          setButtonActivate(true)
          }} />
        <TitleAd value={"Meus Favoritos"} visible={vehiclesFavorites.length > 0 ? true : false}></TitleAd>
        <div className={styles.VehiclesList}>
          {vehiclesFavorites.map(item => (
            <Card 
            onClickToEdit={() => {
              setIsFavoriteVehicle(item.isFavorite)
              setIdVehicleSelecter(item.id)
              setButtonActivate(true)
              setName(item.name)
              setPrice(`${item.price}`)
              setColor(item.color)
              setYear(`${item.year}`)
              setPlate(item.plate)
              setDescription(item.description)
            }}
            onClickToDelete={() => {
              setDeleteActivate(true) 
              setItemToDelete(item.id)}} onClick={() => toggleFavorite(item.id, item.isFavorite)} title={item.name} color={item.color} favorite={item.isFavorite ? true : false} key={item.id}>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            <p>Year: {item.year}</p>
          </Card>
        ))}
        </div>
        <TitleAd value={"Meus Anuncios"} visible={vehiclesCommuns.length > 0 ? true : false}></TitleAd>
        <div className={styles.VehiclesList}>
          {vehiclesCommuns.map(item => (
            <Card 
              onClickToEdit={() => {
                setButtonActivate(true)
                setIdVehicleSelecter(item.id)
                setIsFavoriteVehicle(item.isFavorite)
                setName(item.name)
                setPrice(`${item.price}`)
                setColor(item.color)
                setYear(`${item.year}`)
                setPlate(item.plate)
                setDescription(item.description)
            }}
              onClickToDelete={() => {
                setDeleteActivate(true)
                setItemToDelete(item.id)
              }} onClick={() => toggleFavorite(item.id, item.isFavorite)} title={item.name} color={item.color} favorite={item.isFavorite ? true : false} key={item.id}>
            <p>Price: {item.price}</p>
            <p>Description: {item.description}</p>
            <p>Year: {item.year}</p>
          </Card>
        ))}
        </div>
        

        <Dialog open={buttonActivate}
        fullWidth
        PaperProps={{sx: {p:10, backgroundColor: "#f7f3f3"}}}
        onClose={() => {
          setButtonActivate(false)
          cleanForm()
          setIdVehicleSelecter(null)
          setIsFavoriteVehicle(null)
        }}>
            <Grid container spacing={2} direction={"column"}>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Nome:" 
                placeHolder="Digite aqui" 
                function={setName}
                value={name}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Descriçao:" 
                placeHolder="Digite aqui"
                function={setDescription} 
                value={description}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Preço:" 
                placeHolder="Digite aqui" 
                function={setPrice}
                value={price}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Cor:" 
                placeHolder="Digite aqui" 
                function={setColor}
                value={color}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Ano:" 
                placeHolder="Digite aqui" 
                function={setYear}
                value={year}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={12} alignSelf={"flex-start"} direction="column">
                <InputLabel 
                label="Placa:" 
                placeHolder="Digite aqui"
                function={setPlate} 
                value={plate}
                width={200}
                mdwidth={400}
                ></InputLabel>
              </Grid>
              <Grid item xs={2} alignSelf={"flex-end"} justifySelf={"center"}>
                <Button text="Salvar" onClick={() => {
                  idVehicleSelected != null ? 
                  updateVehicle(idVehicleSelected, {
                  name,
                  description,
                  color, 
                  year, 
                  plate,
                  price, 
                }, isFavoriteVehicle
                ): registerVehicle(
                    idVehicleSelected, {
                    name,
                    description,
                    color, 
                    year, 
                    plate,
                    price,
                    isFavorite : 0,
                  }
                )
                setButtonActivate(false)}}></Button>
              </Grid>
            </Grid> 
        </Dialog>
        
        <Dialog 
        open={deleteActivate}
        PaperProps={{sx: {p:3, backgroundColor: "#f7f3f3"}}}
        onClose={() => setDeleteActivate(false)}
        >
        <Grid container>
          <Grid item xs={12}>
            <Alert 
            variant={"filled"}
            severity={"warning"}>
            Deseja realmente excluir esse veiculo da sua lista ?
          </Alert>
          </Grid>
          <Grid item xs={12} paddingTop={3} alignSelf={"flex-end"}>
            <Button text="Excluir" onClick={()=> {
              deleteVehicle(itemToDelete)
              setDeleteActivate(false)
            }}></Button>
           
          </Grid>
        </Grid>
        </Dialog>

        <Dialog 
        open={filterActivate}
        PaperProps={{sx: {p:10, backgroundColor: "#f7f3f3"}}}
        onClose={() => setFilterActivate(false)}>
        <Grid container direction={"column"}>
            <Grid item xs={12} md={12}>
             <InputSelect
              itens={vehicleColorsFilter}
              value={colorFilter}
              label={"Cor:"}
              onChange={setColorFilter}
              width={200}
              mdwidth={400}
             ></InputSelect>
            </Grid>
            <Grid item xs={12}>
              <InputSelect
                itens={vehicleYearsFilter}
                value={yearFilter}
                label={"Ano:"}
                onChange={setYearFilter}
                width={200}
                mdwidth={400}
              ></InputSelect>
            </Grid>
            <Grid item xs={2} direction="row">
            <InputLabel 
                label="Valor Min:" 
                placeHolder="Digite aqui"
                function={setMinValue} 
                value={minValue}
                width={150}
                mdwidth={100}
                ></InputLabel>
              <InputLabel 
                label="Valor Max:" 
                placeHolder="Digite aqui"
                function={setMaxValue} 
                value={maxValue}
                width={150}
                mdwidth={100}
                ></InputLabel>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item alignSelf={"flex-end"} sx={{marginTop: 5}} xs={12}><Button  text="Salvar" 
            onClick={()=> {
              //setVehicles(colorFilter ? vehicles.filter(item => item.color === colorFilter) : vehicles)
              //setVehicles(yearFilter ? vehicles.filter(item => item.year === parseInt(yearFilter)) : vehicles)
              //setVehicles(maxValue ? vehicles.filter( item => item.price < parseInt(maxValue)) : vehicles)
              //setVehicles(minValue ? vehicles.filter( item => item.price > parseInt(minValue)) : vehicles)

              setFilterActivate(false)}
              }></Button></Grid>
        </Grid>
        </Dialog>
      </main>
    </div>
  );
};

export default VehiclesPage;
