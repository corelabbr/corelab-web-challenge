O projeto consiste no desenvolvimento de uma aplicação web que utiliza o backend desenvolvido no teste prático. Um container Docker acompanha o projeto para a execução dos serviços, garantindo um ambiente isolado e fácil de reproduzir.

A interface da aplicação é basicamente composta por três elementos principais em torno de uma anotação (Todo): edição, visualização e interação com as funcionalidades relacionadas a ela.

O componente TodoForm é responsável por conter a lógica para alteração dos dados de uma anotação. Ele permite ao usuário editar e atualizar as informações da anotação.

Por outro lado, o componente pai Todo tem o papel de controlar o estado de edição ou visualização das anotações. Ele gerencia o fluxo de dados e decide se a anotação deve ser exibida em modo de edição ou visualização, dependendo da interação do usuário.

Essa abordagem divide a responsabilidade entre os componentes, facilitando a manutenção e o desenvolvimento da aplicação. Enquanto o TodoForm cuida das operações específicas de edição de uma anotação, o componente pai Todo gerencia o estado global da aplicação e controla o fluxo de exibição das anotações.
