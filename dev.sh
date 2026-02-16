#!/bin/bash

# Script de desenvolvimento com hot reload no Frontend
# Backend e Database rodam normais, Frontend com Vite dev server

set -e

echo "🚀 Iniciando ambiente de desenvolvimento..."
echo ""

# Verifica se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi

# Para containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down > /dev/null 2>&1 || true

# Sobe ambiente de desenvolvimento
echo "📦 Iniciando containers de desenvolvimento..."
docker-compose -f docker-compose.dev.yml up -d

echo ""
echo "✅ Ambiente iniciado!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 SERVIÇOS RODANDO:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎨 Frontend (HOT RELOAD): http://localhost:5173"
echo "📦 Backend API:           http://localhost:8080"
echo "🐘 PostgreSQL:            localhost:5432"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💡 FUNCIONALIDADES:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Frontend: Mudanças aparecem INSTANTANEAMENTE (Vite HMR)"
echo "⚠️  Backend: Requer rebuild para mudanças (docker-compose up --build backend)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 COMANDOS ÚTEIS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Ver logs:"
echo "  docker-compose -f docker-compose.dev.yml logs -f"
echo ""
echo "Ver logs do frontend:"
echo "  docker-compose -f docker-compose.dev.yml logs -f frontend"
echo ""
echo "Rebuild backend após mudanças:"
echo "  docker-compose -f docker-compose.dev.yml up --build -d backend"
echo ""
echo "Parar tudo:"
echo "  docker-compose -f docker-compose.dev.yml down"
echo ""
