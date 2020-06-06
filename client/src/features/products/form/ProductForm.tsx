import React from "react";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";

const ProductForm = () => {
  return (
    <div></div>
    // <Grid>
    //   <Grid.Column width={10}>
    //     <Segment clearing>
    //       <FinalForm
    //         validate={validate}
    //         initialValues={activity}
    //         onSubmit={handleFinalFormSubmit}
    //         render={({ handleSubmit, invalid, pristine }) => (
    //           <Form onSubmit={handleSubmit} loading={loading}>
    //             <Field
    //               name="title"
    //               placeholder="Title"
    //               value={activity.title}
    //               component={TextInput}
    //             />
    //             <Field
    //               name="description"
    //               placeholder="Description"
    //               rows={3}
    //               value={activity.description}
    //               component={TextAreaInput}
    //             />
    //             <Field
    //               name="category"
    //               placeholder="Category"
    //               options={category}
    //               value={activity.category}
    //               component={SelectInput}
    //             />
    //             <Form.Group widths="equal">
    //               <Field
    //                 name="date"
    //                 placeholder="Date"
    //                 date={true}
    //                 value={activity.date}
    //                 component={DateInput}
    //               />{" "}
    //               <Field
    //                 name="time"
    //                 placeholder="Time"
    //                 time={true}
    //                 value={activity.date}
    //                 component={DateInput}
    //               />
    //             </Form.Group>

    //             <Field
    //               name="city"
    //               placeholder="City"
    //               value={activity.city}
    //               component={TextInput}
    //             />
    //             <Field
    //               name="venue"
    //               placeholder="Venue"
    //               value={activity.venue}
    //               component={TextInput}
    //             />
    //             <Button
    //               loading={submitting}
    //               disabled={loading || invalid || pristine}
    //               floated="right"
    //               positive
    //               type="submit"
    //               content="Submit"
    //             />
    //             <Button
    //               onClick={
    //                 activity.id
    //                   ? () => history.push(`/activities/${activity.id}`)
    //                   : () => history.push("/activities")
    //               }
    //               disabled={loading}
    //               floated="right"
    //               type="submit"
    //               content="Cancel"
    //             />
    //           </Form>
    //         )}
    //       />
    //     </Segment>
    //   </Grid.Column>
    // </Grid>
  );
};

export default ProductForm;
