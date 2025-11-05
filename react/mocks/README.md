# 📧 Mock Data para Templates de E-mail

Esta pasta contém os dados mockados para diferentes templates de e-mail da VTEX.

## 📁 Estrutura

```
mocks/
├── README.md              # Este arquivo
├── TEMPLATE_GUIDE.md      # 📚 Guia completo de criação de templates
├── index.ts               # Exportações principais
├── examples.ts            # Exemplos de uso
└── templates/             # Templates específicos
    ├── index.ts           # Índice dos templates
    ├── vtexid_check_email.ts     # Access Key
    └── vtexcommerce_new_order.ts # Order Confirmation
```

## 🎯 Como Usar

```typescript
import { getCompleteTemplateData } from './mocks'

// Obter dados completos de um template
const templateData = getCompleteTemplateData('vtexid_check_email')
console.log(templateData.mockData)    // Dados mockados
console.log(templateData.subject)     // Subject gerado
console.log(templateData.recipient)   // Email do destinatário
```

## ✨ Templates Disponíveis

- **vtexid_check_email** - Chave de acesso para autenticação
- **vtexcommerce-new-order** - Confirmação de pedido

## 📝 Adicionar Novos Templates

### 📚 Guia Completo
Para instruções detalhadas sobre como criar novos templates, consulte:

**[📖 TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)**

### 🚀 Processo Rápido

1. **Encontre o template** em `/admin/message-center#/templates`
2. **Copie o ID** da URL (ex: `vtex-payment-approved`)
3. **Crie o arquivo** `templates/vtex_payment_approved.ts`
4. **Implemente** seguindo os templates existentes como referência
5. **Registre** no arquivo `templates/index.ts`
6. **Teste** localmente e abra um PR!

## 🤝 Contribuindo

Sua contribuição ajuda toda a comunidade VTEX! Para adicionar novos templates:

1. **Leia o guia completo**: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)
2. **Siga a estrutura** dos templates existentes
3. **Teste localmente** com `vtex link`
4. **Abra um Pull Request** com descrição detalhada

**Templates mais procurados para implementar:**
- `vtex-payment-approved` - Pagamento Aprovado
- `vtex-order-shipped` - Pedido Enviado  
- `vtex-password-reset` - Reset de Senha
- `vtex-abandoned-cart` - Carrinho Abandonado

---

**📚 Documentação completa:** [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)