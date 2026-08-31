export type TimeContent = { greeting: string; subMessage: string; nowMessage: string }

// 条件は上から評価されます。将来、曜日や記録状況の条件をここに追加できます。
export function getTimeContent(date = new Date()): TimeContent {
  const hour = date.getHours()

  if (hour >= 6 && hour < 11) return {
    greeting: 'おはよう、京平',
    subMessage: '今日も、自分のペースでいこう。',
    nowMessage: 'おはよう。今日の予定を確認しよう',
  }
  if (hour >= 11 && hour < 18) return {
    greeting: 'こんにちは、京平',
    subMessage: 'ひとつずつ、心地よく進めよう。',
    nowMessage: 'そろそろ今日のモードに切り替えよう',
  }
  if (hour >= 18 && hour < 22) return {
    greeting: 'おつかれ、京平',
    subMessage: '今日もおつかれさま。',
    nowMessage: '今日もおつかれさま。少し振り返ってみる？',
  }
  return {
    greeting: 'おつかれ、京平',
    subMessage: 'ゆっくり、自分の時間を過ごそう。',
    nowMessage: '今日を記録して、気持ちよく終わろう',
  }
}
