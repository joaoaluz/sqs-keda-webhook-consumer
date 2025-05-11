# sqs-keda-webhook-consumer

Este projeto fornece uma solução completa para consumir mensagens de uma fila Amazon SQS, processá-las com um script em TypeScript e notificar um webhook. Além disso, utiliza o KEDA para escalar automaticamente o deployment no Kubernetes com base no número de mensagens na fila.

## 🧩 Visão Geral

- **Consumo de mensagens SQS**: Script em TypeScript que consome mensagens de uma fila Amazon SQS.
- **Notificação via Webhook**: Após o processamento, as mensagens são enviadas para um endpoint webhook configurado.
- **Escalonamento com KEDA**: Utiliza o KEDA para escalar automaticamente o deployment no Kubernetes com base na quantidade de mensagens na fila SQS.
- **Containerização com Docker**: O script é empacotado em uma imagem Docker para facilitar o deployment no Kubernetes.

## 📁 Estrutura do Projeto
```shell
.
├── k8s/
│ ├── deployment.yaml
│ ├── keda-scaledobject.yaml
│ └── trigger-auth.yaml
├── src/
│ └── index.ts
├── Dockerfile
├── package.json
└── tsconfig.json

```

## 🚀 Como Usar

### Pré-requisitos

- Node.js e npm instalados
- AWS CLI configurado com as credenciais apropriadas
- Cluster Kubernetes com KEDA instalado
- kubectl configurado para se conectar ao seu cluster

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/joaoaluz/sqs-keda-webhook-consumer.git
cd sqs-keda-webhook-consumer
```

2. Instale as dependências:

```bash
npm install
```


Docker

1. Construa a imagem Docker:

```bash
docker build -t sqs-keda-webhook-consumer .
```

2. Execute o container localmente (opcional):

```bash
docker run -e AWS_ACCESS_KEY_ID=your_key \
           -e AWS_SECRET_ACCESS_KEY=your_secret \
           -e SQS_QUEUE_URL=your_queue_url \
           -e WEBHOOK_URL=your_webhook_url \
           sqs-keda-webhook-consumer
```

Deployment no Kubernetes

1. Aplique os manifests do Kubernetes:
```bash
kubectl apply -f k8s/
```

2. Verifique se o deployment e o ScaledObject do KEDA foram criados corretamente:
```bash
kubectl get deployments
kubectl get scaledobjects
```

⚙️ Configuração

As seguintes variáveis de ambiente são utilizadas:

- ```AWS_ACCESS_KEY_ID```: ID da chave de acesso da AWS

- ```AWS_SECRET_ACCESS_KEY```: Chave secreta de acesso da AWS

- ```SQS_QUEUE_URL```: URL da fila SQS a ser consumida

- ```WEBHOOK_URL```: URL do webhook que receberá as notificações

🛠️ Tecnologias Utilizadas


<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="40" height="40"/>
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS"/>
  <img src="https://raw.githubusercontent.com/kedacore/keda/main/logo/keda-logo.svg" alt="KEDA" width="90"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" width="40" height="40"/>
</p>

