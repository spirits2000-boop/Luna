# 🌙 Luna - Music Streaming Application

Luna это современное музыкальное приложение, вдохновленное Spotify, с полным функционалом поиска, воспроизведения музыки, создания плейлистов и многого другого.

## ✨ Основные функции

- 🎵 **Воспроизведение музыки** - Слушайте треки в высоком качестве
- 🔍 **Поиск** - Найдите любимые песни, исполнителей и альбомы
- ❤️ **Избранное** - Сохраняйте любимые треки
- 📋 **Плейлисты** - Создавайте и управляйте плейлистами
- 👤 **Профиль** - Личный профиль с историей прослушиваний
- 🎨 **Современный UI** - Красивый и интуитивный интерфейс
- 🔐 **Аутентификация** - Безопасная регистрация и вход

## 🛠️ Технологический стек

### Frontend
- **React 18** - Современная библиотека для UI
- **TypeScript** - Типизация JavaScript
- **Tailwind CSS** - Стилизация
- **Axios** - HTTP клиент
- **React Router** - Маршрутизация
- **Zustand** - State management

### Backend
- **Node.js & Express** - Серверная часть
- **PostgreSQL** - База данных
- **JWT** - Аутентификация
- **Bcrypt** - Хеширование паролей
- **Multer** - Загрузка файлов

## 📦 Структура проекта

```
Luna/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── backend/           # Express сервер
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
└── docker-compose.yml # Docker конфигурация
```

## 🚀 Быстрый старт

### Требования
- Node.js >= 16
- PostgreSQL >= 12
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/spirits2000-boop/Luna.git
cd Luna
```

2. **Установите зависимости Backend**
```bash
cd backend
npm install
```

3. **Установите зависимости Frontend**
```bash
cd ../frontend
npm install
```

4. **Настройте переменные окружения**
```bash
# backend/.env
DATABASE_URL=postgresql://user:password@localhost:5432/luna
JWT_SECRET=your-secret-key
PORT=5000

# frontend/.env
REACT_APP_API_URL=http://localhost:5000
```

5. **Запустите приложение**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

Приложение будет доступно на http://localhost:3000

## 📚 API Документация

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход

### Музыка
- `GET /api/tracks` - Получить все треки
- `GET /api/tracks/:id` - Получить трек по ID
- `GET /api/tracks/search?q=query` - Поиск треков
- `POST /api/tracks` - Загрузить трек (админ)

### Плейлисты
- `GET /api/playlists` - Мои плейлисты
- `POST /api/playlists` - Создать плейлист
- `PUT /api/playlists/:id` - Обновить плейлист
- `DELETE /api/playlists/:id` - Удалить плейлист
- `POST /api/playlists/:id/tracks` - Добавить трек в плейлист

### Избранное
- `GET /api/favorites` - Получить избранные треки
- `POST /api/favorites/:trackId` - Добавить в избранное
- `DELETE /api/favorites/:trackId` - Удалить из избранного

## 🤝 Разработка

### Команды

**Backend:**
- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка
- `npm test` - Тесты

**Frontend:**
- `npm start` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm test` - Тесты

## 📝 Лицензия

MIT License - смотрите файл LICENSE для деталей

## 👨‍💻 Автор

Создано с ❤️ для любителей музыки
