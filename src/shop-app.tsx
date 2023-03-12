import * as React from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import { ProductList } from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";

export const ShopApp: React.FC<{}> = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [numFavorites, setNumFavorites] = React.useState<number>(0);
  const [prodCount, setProdCount] = React.useState<number>(0);

  React.useEffect(() => {
    fetch('https://fakestoreapi.com/products').then((response) => {
      let jsonResponse = response.json();

      jsonResponse.then((rawData) => {
        setProducts(rawData);
        setProdCount(rawData.length);
      });
    });
    document.title = "Droppe refactor app"
  }, []);

  const favClick = (index: number) =>  {
    const prods = products;
    const idx = index
    let currentFavs = numFavorites;
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }

    setProducts(prods);
    setNumFavorites(totalFavs);
  }

  const onSubmit = (payload: { title: string; description: string, price: string }) => {
    const updated = lodash.clone(products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price
    });

    setProducts(updated);
    setProdCount(lodash.size(updated));

    setIsOpen(false);

    setIsShowingMessage(true);
    setMessage('Adding product...');

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: payload.title,
                    price: payload.price,
                    description: payload.description,
                }
            )
        })
        .then(res=>res.json())
        .then(json => {
            (function (t) {
              setTimeout(() => {
                setIsShowingMessage(false);
                setMessage('');
              }, 2000)
          })();
        })
  }


    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={['container', styles.headerImageWrapper].join(' ')}>
            <img src={logo} className={styles.headerImage} />
          </div>
        </div>

        <>
           <span
              className={['container', styles.main].join(' ')}
              style={{margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly'}}
           >
            <img src={img1} style={{maxHeight: "15em", display: 'block'}} />
            <img src={img2} style={{maxHeight: "15rem", display: 'block'}} />
           </span>
        </>

        <div className={['container', styles.main].join(' ')} style={{paddingTop: 0}}>
          <div className={styles.buttonWrapper}>
            <span role="button">
               <Button
                  onClick={() => setIsOpen(true)}
               >Send product proposal</Button>
            </span>
             {isShowingMessage && <div className={styles.messageContainer}>
                <i>{message}</i>
             </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {prodCount}</span>
            {' - '}
            <span>Number of favorites: {numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={favClick} /> : <div></div>}
        </div>

        <>
           <Modal
              isOpen={isOpen}
              className={styles.reactModalContent}
              overlayClassName={styles.reactModalOverlay}
           >
              <div className={styles.modalContentHelper}>
                 <div
                    className={styles.modalClose}
                    onClick={() => setIsOpen(false)}
                 ><FaTimes /></div>

                 <Form
                    on-submit={onSubmit}
                 />
              </div>
           </Modal>
        </>
      </React.Fragment>
    );

}
