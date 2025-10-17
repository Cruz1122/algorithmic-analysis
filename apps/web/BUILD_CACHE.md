# Configuración de Build Caché para Next.js

Este documento explica cómo configurar y optimizar el build caché para mejorar los tiempos de compilación en desarrollo y CI/CD.

## Configuración Actual

### 1. Next.js Config (`next.config.mjs`)
```javascript
experimental: {
  optimizeCss: true, // Optimiza CSS para mejor rendimiento
  optimizePackageImports: ['lucide-react'], // Optimiza imports de paquetes
},
compiler: {
  removeConsole: process.env.NODE_ENV === 'production', // Remueve console.log en producción
}
```

### 2. Variables de Entorno
- `NEXT_TELEMETRY_DISABLED=1`: Deshabilita telemetría para builds más rápidos

### 3. Scripts de Build
- `build`: Build estándar con telemetría deshabilitada
- `build:ci`: Build optimizado para CI sin linting

## Configuración para Desarrollo Local

### Habilitar Caché Local
```bash
# Crear archivo .env.local
echo "NEXT_TELEMETRY_DISABLED=1" > .env.local
```

### Limpiar Caché (si es necesario)
```bash
# Limpiar caché de Next.js
rm -rf .next/cache

# Rebuild completo
pnpm build
```

## CI/CD (GitHub Actions)

El workflow en `.github/workflows/ci.yml` incluye:

1. **Caché de pnpm**: Cachea dependencias de Node.js
2. **Caché de Next.js**: Cachea archivos de build de Next.js
3. **Variables de entorno**: Optimiza el build para CI

### Estructura de Caché en CI
```
- pnpm store cache
- Next.js build cache (.next/cache)
- Next.js static files (.next/static)
```

## Beneficios

- **Desarrollo**: Builds incrementales más rápidos
- **CI/CD**: Reducción significativa de tiempos de build
- **Optimización**: Menor uso de recursos en CI

## Troubleshooting

### Si el caché no funciona
1. Verificar variables de entorno
2. Limpiar caché manualmente
3. Verificar permisos de archivos en CI

### Verificar estado del caché
```bash
# Ver tamaño del caché
du -sh .next/cache

# Listar archivos en caché
ls -la .next/cache
```
