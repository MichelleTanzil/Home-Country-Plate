import React, { useContext, SyntheticEvent, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';


const CheckoutForm = () => {

  const rootStore = useContext(RootStoreContext);

  const elements = useElements();
  const stripe = useStripe();

  const onSub = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      toast.error("Error payment");
    }

    var secret = await agent.Cart.pay();

    const result = await stripe?.confirmCardPayment(secret, {
      payment_method: {
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name: rootStore.userStore.user?.displayName,
        }
      }
    })
    if (result?.error) {
      toast.error("error in payment proccess");
      console.log(result.error.message);
    } else {
      if (result?.paymentIntent?.status === "succeeded") {
        toast.success("payment procccess");
      }
    }
  }

  return (
    <form onSubmit={onSub} >
      <CardElement />
      <Button>Submit</Button>
    </form>
  );
};


export default observer(CheckoutForm);