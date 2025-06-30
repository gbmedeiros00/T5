Como rodar o projeto:

Backend
<br>
cd backend
<br>
npm install
<br>
npx prisma generate
<br>
npx prisma migrate dev
<br>
npm run dev
<br>
Na pasta src/ crie um arquivo .env e adicione a seguinte linha:

DATABASE_URL = "mysql://usuario:senha@pldb"
<br>

Frontend
<br>
cd frontend
<br>
npm install
<br>
npm run dev
<br>
Acesse em: http://localhost:5173
