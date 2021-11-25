import React, { useEffect} from 'react';
import { Card } from 'react-bootstrap';
import Title from '../Title';
import SpinnerOng from '../SpinnerOng';
import './news.css'
import ReactHtmlParser from 'react-html-parser';
import { useSelector, useDispatch } from 'react-redux'
import { getNewsInfo } from '../../features/news/newsSlice'

export default function News() {

  const news = useSelector ((state) => state.news.fetched)
  const status = useSelector (state => state.news.status) 
  const dispatch = useDispatch()

  useEffect(()=> {
    if (status === 'idle') {
      dispatch(getNewsInfo())
    }
   
    console.log(news)
  }, [status, dispatch, news])

  return ( 
    <>
      {news.length === 0 ? (
        <SpinnerOng />
      ) : (
        <>
          <div className='contenedor-news'>
            <div>
              <Title
                urlImage={
                  'https://www.pelotabuenosaires.com.ar/wp-content/uploads/2018/03/Novedades-940x360.png'
                }
                titleName={'Novedades'}
              />
            </div>
         <div className='contenedor-tarjetas'>
            {news.map((item) => {
                return (
                  <Card className='tarjeta' style={{ width: '18rem' }} key={item.id}>
                    <Card.Img className='img-tarjeta' variant='top' src={item.image} />
                    <Card.Body>
                      <Card.Title className='titulo-tarjeta'>{ReactHtmlParser(item.name)}</Card.Title>
                      <Card.Text className='parrafo-tarjeta'>{ReactHtmlParser(item.content)}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
         </div>
          
          </div>
        </>
      )}
    </>
  );
}
