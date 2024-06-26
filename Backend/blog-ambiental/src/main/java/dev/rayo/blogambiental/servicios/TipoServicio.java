package dev.rayo.blogambiental.servicios;

import dev.rayo.blogambiental.entidades.Articulo;
import dev.rayo.blogambiental.entidades.Tipo;
import dev.rayo.blogambiental.enumeraciones.TipoArticulo;
import dev.rayo.blogambiental.excepciones.MiException;
import dev.rayo.blogambiental.repositorios.ArticuloRepositorio;
import dev.rayo.blogambiental.repositorios.TipoRepositorio;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class TipoServicio {

    @Autowired
    private TipoRepositorio tipoRepositorio;

    @Autowired
    private ArticuloRepositorio articuloRepositorio;

    private void validar(String nombre)throws MiException{
        if (nombre.isEmpty()) {
            throw new MiException("El nombre no puede estar vacio");
        }
    }

    @Transactional
    @PostConstruct
    private void inizializar(){
        List<Tipo> tipos = tipoRepositorio.findAll();
        if(tipos.isEmpty()) {
            for (TipoArticulo nombre :TipoArticulo.values()) {
                Tipo tipo = new Tipo();
                tipo.setNombre(nombre.toString());
                tipoRepositorio.save(tipo);
            }
        }
    }
    @Transactional
    public Tipo registrar(Tipo tipoEntrada) throws MiException {
        String nombre = tipoEntrada.getNombre();
        validar(nombre);
        Tipo tipo = new Tipo();
        tipo.setNombre(nombre);
        tipoRepositorio.save(tipo);
        return tipo;
    }

    @Transactional
    public Tipo actualizar(Long idTipo, Tipo tipoEntrada)throws MiException{
        String nombre = tipoEntrada.getNombre();
        validar(nombre);
        Optional<Tipo> tipoEncontrado = tipoRepositorio.findById(idTipo);

        if (tipoEncontrado.isPresent()) {
            Tipo tipo = tipoEncontrado.get();
            tipo.setNombre(nombre);
            tipoRepositorio.save(tipo);
            return tipo;
        }
        else{
            return null;
        }
    }

    @Transactional
    public void eliminar(Long id) {
        tipoRepositorio.deleteById(id);
    }

    @Transactional
    public Tipo buscarTipo(Long idTipo) throws MiException{
        Optional<Tipo> tipoEncontrado = tipoRepositorio.findById(idTipo);
        if(tipoEncontrado.isPresent()){
            Tipo tipo = tipoEncontrado.get(); // es el tipo (entidad) buscado por id
            return tipo;
        }else{
            throw new MiException("Tipo no encontrado");
        }
    }

    @Transactional
    public List<Tipo> listarTodosTipos(){
        List<Tipo> tipos = null;
        tipos = tipoRepositorio.findAll();
        return tipos;
    }
}
