import utilStyles from "@/styles/utils.module.scss"
import cardStyles from "@/styles/cards.module.scss"
import {GTFont} from "@/app/font";
import Card from "@/app/components/Card";

export default function Home() {
  return (
    <main className={utilStyles.container}>
      <h1 className={utilStyles.title}>Wendor To-Do Application</h1>
      <div className={utilStyles.flex_end}>
        <button className={`${utilStyles.create_button} ${GTFont.className}`}>CREATE TODO</button>
      </div>
      
      <div className={cardStyles.card_main_body}>
        <Card title="PENDING" />
        <Card title="ON-GOING" />
        <Card title="COMPLETED" />
      </div>
    </main>
  )
}
