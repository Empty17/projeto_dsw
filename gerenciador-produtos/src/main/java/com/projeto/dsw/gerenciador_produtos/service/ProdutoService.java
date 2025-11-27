package com.projeto.dsw.gerenciador_produtos.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.dsw.gerenciador_produtos.model.Produto;
import com.projeto.dsw.gerenciador_produtos.repos.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listarProdutos() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"
                ));
    }

    public Produto salvar(Produto produto) {
        return repository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto existente = buscarPorId(id); // procura ID

        existente.setNome(produtoAtualizado.getNome());
        existente.setFabricante(produtoAtualizado.getFabricante());
        existente.setPreco(produtoAtualizado.getPreco());
        existente.setQuantidade(produtoAtualizado.getQuantidade());
        existente.setDescricao(produtoAtualizado.getDescricao());

        return repository.save(existente);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
    }
}