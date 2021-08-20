import { signIn, useSession } from "next-auth/client";
import { api } from "../../service/api";
import { getStripeJs } from "../../service/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  
  async function handleSubscribe() {
    if(!session) {
      signIn('github')
      return;
    }else{
      
      try{
        const response = await api.post('/subscribe')
        const { sessionId } = response.data

        const stripe = await getStripeJs()
        await stripe.redirectToCheckout({sessionId})
      }catch(err){
        alert(err.message)
      }
    }
  }
  return (
    <button
      type="button"
      className={styles.Container}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}