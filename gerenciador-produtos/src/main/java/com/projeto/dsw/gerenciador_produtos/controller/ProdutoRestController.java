package com.projeto.dsw.gerenciador_produtos.controller;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.dsw.gerenciador_produtos.model.Produto;
import com.projeto.dsw.gerenciador_produtos.service.ProdutoService;


@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoRestController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarProdutos();
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Produto> salvarProduto(@RequestBody @Valid Produto produto) {
        Produto novoProduto = produtoService.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable Long id,
                                    @RequestBody @Valid Produto produto) {
        return produtoService.atualizar(id, produto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirProduto(@PathVariable Long id) {
        produtoService.excluir(id);
    }
}
