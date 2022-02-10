type User = {
    id: number
    name: string
    part: string
}

export default function UserPage({ postData }: { postData: User }) {
    return (
      <>
        <p>ユーザー詳細</p>
        <p>画像</p>
        <div>
            <div>
                <p>{postData.name}</p>
                <p>(30)</p>
            </div>
            <p>{postData.part}</p>
        </div>
        <div>
            <p>画像リスト</p>
        </div>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div>
            <h3>演奏動画</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/41OaY9m8iqE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div>
            <h3>好きなジャンル</h3>
            <div>

            </div>
        </div>
        <div>
            <h3>好きなアーティスト</h3>
            <div>
                
            </div>
        </div>
        <div>
            <h3>その他</h3>
            <div>
                
            </div>
        </div>
        <div>
            <button>いいねする</button>
        </div>
      </>
    )
  }
  
  export async function getStaticPaths() {
    // 存在するidのリストをここで生成して返す
    const paths = [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ]
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }: {params: any }) {
    // 現在リクエストされている該当idの情報を取得する、本来はここでAPIリクエスト
    const users = [
        { name: 'fushinuki', id: 1, part: 'drums'},
        { name: 'taro', id: 2, part: 'guitar'}
    ]

    const postData = users.find(user => user.id === parseInt(params.id))
    return {
      props: {
        postData
      }
    }
  }
  