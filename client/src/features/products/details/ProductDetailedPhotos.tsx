import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IProduct } from "../../../app/models/product";

const ProductDetailedPhotos: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    uploadPhoto,
    uploadingProductPhoto,
    setMainPhoto,
    deletePhoto,
    loadingPhoto,
  } = rootStore.productStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(product.id, photo).then(() => setAddPhotoMode(false));
  };

  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {product.isChef && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingProductPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {product.photos &&
                product.photos.map((photo) => (
                  <p>{photo.url}</p>
                  // <Card key={photo.id}>
                  //   <Image src={photo.url} />
                  //   {product.isChef && (
                  //     <Button.Group fluid widths={2}>
                  //       <Button
                  //         name={photo.id}
                  //         onClick={(e) => {
                  //           setMainPhoto(photo.id, photo);
                  //           setTarget(e.currentTarget.name);
                  //         }}
                  //         disabled={photo.isMain}
                  //         loading={loadingPhoto && target === photo.id}
                  //         basic
                  //         positive
                  //         content="Main"
                  //       />
                  //       <Button
                  //         name={photo.id}
                  //         disabled={photo.isMain}
                  //         onClick={(e) => {
                  //           deletePhoto(photo.id, photo);
                  //           setDeleteTarget(e.currentTarget.name);
                  //         }}
                  //         loading={loadingPhoto && deleteTarget === photo.id}
                  //         basic
                  //         negative
                  //         icon="trash"
                  //       />
                  //     </Button.Group>
                  //   )}
                  // </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProductDetailedPhotos);
