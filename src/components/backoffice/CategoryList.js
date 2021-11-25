import React, {useEffect, useState} from 'react'
import {Container, Row, Button, ListGroup} from 'react-bootstrap'
import {LoadingList} from './LoadingList'
import {ItemList} from './ItemList'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAsync, fetchCategories} from '../../features/categories/CategoriesSlice'
import {CATEGORIES} from '../../services/apiRest'
import {getOngApi} from '../../services/publicApiService'
import { Link } from "react-router-dom";
import SpinnerOng from '../SpinnerOng'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export const CategoryList = () => {
  const {values} = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState()
  const [isLoading, setLoad] = useState(true)

  const getCategory = async () => {
    const {data} = await getOngApi(CATEGORIES)

    //I did it this way to simulate the loading of data from the api and to be able to observe the behavior of the loader.
    try {
      setCategories(data.data)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(fetchAsync())
    console.log(values)
    setLoad(false)
  }, [])

  return (
    <div>
      {isLoading ?
        <SpinnerOng/> :
        <Container>
          <Container className="mt-3">
              <h2 className="text-center">Categorías</h2>
          </Container>
          <Container className="d-flex justify-content-end align-items-center">
            <Link to="/backoffice/categories/create">
                <Button variant="success" className="border-0 py-1">
                <FontAwesomeIcon icon={faPlus}/>
                <span
                    style={{
                    border: "1px solid white",
                    margin: "0 10px",
                    }}
                ></span>
                Crear
                </Button>
            </Link>
          </Container>
          <Container>
            <ListGroup>
            {
                !values ?
                  //The <LoadingList/> component must receive a number, which will be the
                  //amount of loaders that you want to show
                  <LoadingList quantity={3}/>
                  : (
                    values?.map(item =>
                      <ItemList
                        key={item.id}
                        name={item.name}
                        date={item.created_at}
                        image={item.image}
                      />
                    )
                  )
              }
            </ListGroup>
          </Container>
        </Container>
      }
    </div>
  )
}
