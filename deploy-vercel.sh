#!/bin/bash

# Vercel Deployment Quick Start Script
# Este script te ayuda a desplegar rápidamente en Vercel

echo "🚀 Panadería App - Vercel Deployment Helper"
echo "=========================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Vercel CLI no está instalado. Instalando..."
    npm install -g vercel
fi

echo "✅ Vercel CLI listo"
echo ""

# Login to Vercel
echo "🔑 Por favor, inicia sesión en Vercel..."
vercel login

echo ""
echo "🔗 Vinculando proyecto..."
vercel link

echo ""
echo "📋 Opciones de despliegue:"
echo "1. Deploy a Production"
echo "2. Deploy a Preview"
echo "3. Solo configurar (no deploy)"
echo ""

read -p "Selecciona una opción (1-3): " option

case $option in
    1)
        echo ""
        echo "🚀 Desplegando a Production..."
        vercel --prod
        ;;
    2)
        echo ""
        echo "🚀 Desplegando a Preview..."
        vercel
        ;;
    3)
        echo ""
        echo "⚙️  Proyecto configurado. Puedes desplegar manualmente con:"
        echo "   vercel         (preview)"
        echo "   vercel --prod  (production)"
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

echo ""
echo "✨ ¡Listo!"
echo ""
echo "📚 Recursos útiles:"
echo "   - Guía completa: ./DEPLOYMENT.md"
echo "   - Dashboard: https://vercel.com/dashboard"
echo "   - Docs: https://vercel.com/docs"
