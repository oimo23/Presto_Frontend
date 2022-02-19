import { User } from '../../modules/types/User'

export type Props = {
  query: { id: string }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const User = (props: any) => {
  return (
    <div>
      <h1>{props.user.name}</h1>
      <p>年齢：{props.user.age}</p>
      <div>
        {props.user.parts.map((part: string) => {
          return <p key={part}>{part}</p>
        })}
      </div>
    </div>
  )
}

export default User

export async function getStaticProps(context: { params: { id: string } }) {
  const userId = context.params.id
  const user = await fetcher(`http://localhost:3000/api/users/${userId}`)
  return {
    props: { userId, user },
    revalidate: 30, // ここを追加
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      // 生成されるページのURLのパス一覧
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false,
  }
}
